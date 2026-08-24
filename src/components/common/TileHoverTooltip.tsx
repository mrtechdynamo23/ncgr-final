import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

interface TileHoverTooltipProps {
  title: string;
  summary: string;
  children: React.ReactNode;
  delayMs?: number;
}

export const TileHoverTooltip: React.FC<TileHoverTooltipProps> = ({
  title,
  summary,
  children,
  delayMs = 120,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; position: 'top' | 'bottom'; arrowLeft: number }>({
    top: 0,
    left: 0,
    position: 'top',
    arrowLeft: 140,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);

  const getTargetElement = (): HTMLElement | null => {
    if (!targetRef.current) return null;
    const firstChild = targetRef.current.firstElementChild as HTMLElement | null;
    return firstChild || targetRef.current;
  };

  const updatePosition = () => {
    const el = activeElementRef.current || getTargetElement();
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const tooltipEl = tooltipRef.current;
    const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 280;
    const tooltipHeight = tooltipEl ? tooltipEl.offsetHeight : 80;
    const margin = 8;

    let position: 'top' | 'bottom' = 'top';
    let top = rect.top - tooltipHeight - margin;

    // If not enough room above, place below the tile
    if (top < 10) {
      top = rect.bottom + margin;
      position = 'bottom';
    }

    // Center horizontally over the tile
    const tileCenterX = rect.left + rect.width / 2;
    let left = tileCenterX - tooltipWidth / 2;

    // Viewport edge collision protection
    const minLeft = 12;
    const maxLeft = window.innerWidth - tooltipWidth - 12;

    if (left < minLeft) {
      left = minLeft;
    } else if (left > maxLeft) {
      left = maxLeft;
    }

    // Calculate relative arrow position pointing to tile center
    const arrowLeft = Math.max(16, Math.min(tooltipWidth - 16, tileCenterX - left));

    setCoords({ top, left, position, arrowLeft });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = (e.currentTarget.firstElementChild || e.currentTarget) as HTMLElement;
    activeElementRef.current = el;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const el = (e.currentTarget.firstElementChild || e.currentTarget) as HTMLElement;
    activeElementRef.current = el;
    updatePosition();
    setIsVisible(true);
  };

  const handleBlur = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  // Re-calculate when visible to ensure pixel-perfect positioning with actual rendered height
  useLayoutEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={targetRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      style={{ display: 'contents', outline: 'none' }}
      aria-label={`${title}: ${summary}`}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            width: 280,
            maxWidth: 'calc(100vw - 24px)',
            background: 'rgba(7, 28, 48, 0.97)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(74, 166, 220, 0.3)',
            borderRadius: 8,
            padding: '10px 14px',
            color: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255,255,255,0.2)',
            zIndex: 999999,
            pointerEvents: 'none',
            animation: 'tooltipFadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            boxSizing: 'border-box',
          }}
        >
          {/* Subtle pointer arrow */}
          <div
            style={{
              position: 'absolute',
              [coords.position === 'top' ? 'bottom' : 'top']: -5,
              left: coords.arrowLeft - 5,
              width: 10,
              height: 10,
              background: 'rgba(7, 28, 48, 0.97)',
              borderLeft: '1px solid rgba(74, 166, 220, 0.3)',
              borderTop: coords.position === 'bottom' ? '1px solid rgba(74, 166, 220, 0.3)' : 'none',
              borderBottom: coords.position === 'top' ? '1px solid rgba(74, 166, 220, 0.3)' : 'none',
              transform: 'rotate(45deg)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#4AA6DC',
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>{title}</span>
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              lineHeight: 1.45,
              color: 'rgba(255, 255, 255, 0.92)',
              fontWeight: 500,
            }}
          >
            {summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default TileHoverTooltip;
