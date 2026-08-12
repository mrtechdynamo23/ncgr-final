import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';

interface PlaceholderPageProps {
  titleKey: string;
  namespace?: string;
  descriptionKey?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
}

/**
 * Placeholder page for modules that will be built in later phases.
 * Shows a clean empty state with the module name.
 */
const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  titleKey,
  namespace = 'common',
  isEmpty = false,
  emptyMessage,
}) => {
  const { t } = useTranslation(namespace);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">{t(titleKey)}</h1>
            {!isEmpty && (
              <p className="page-subtitle" style={{ marginTop: 4 }}>
                <span className="simulated-badge">DEMO DATA</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="empty-state">
        <Settings size={48} className="empty-state-icon" />
        <h2 className="empty-state-title">
          {isEmpty ? t(titleKey) : 'Module Coming Soon'}
        </h2>
        <p className="empty-state-description">
          {emptyMessage || (isEmpty
            ? t('app.pendingConfirmation')
            : 'This module is being implemented as part of the portal build.')}
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
