import Fuse from 'fuse.js';
import { technologyPlatforms } from './technology';
import { incidents, managementExceptions } from './incidents';
import { businessServices, applicationsList } from './services';
import { risksList, approvalsList, vendorsList } from './governance';
import { initiativesList } from './transformation';
import { knowledgeDocs } from './knowledge';

export interface SearchableEntity {
  id: string;
  type: 'Technology' | 'Incident' | 'Exception' | 'Service' | 'Application' | 'Risk' | 'Approval' | 'Vendor' | 'Initiative' | 'Knowledge' | 'Page';
  title: string;
  subtitle: string;
  path: string;
  tags: string[];
}

const buildSearchIndex = (): SearchableEntity[] => {
  const items: SearchableEntity[] = [];

  // Quick navigation pages
  const pages: SearchableEntity[] = [
    { id: 'NAV-01', type: 'Page', title: 'Operations Command Centre', subtitle: 'Executive landing page & health grid', path: '/', tags: ['dashboard', 'home', 'kpi'] },
    { id: 'NAV-02', type: 'Page', title: 'Technology Estate', subtitle: 'Master dashboard of all 25 technology platforms', path: '/technology/estate', tags: ['technology', 'platforms', 'tools'] },
    { id: 'NAV-03', type: 'Page', title: 'ServiceNow Platform Health', subtitle: 'ITSM, ITOM, ITAM, CMDB, Discovery status', path: '/technology/servicenow', tags: ['servicenow', 'cmdb', 'itsm'] },
    { id: 'NAV-04', type: 'Page', title: 'Monitoring & Observability', subtitle: 'Splunk, ITSI, SolarWinds, AppDynamics', path: '/technology/monitoring', tags: ['splunk', 'solarwinds', 'appdynamics'] },
    { id: 'NAV-05', type: 'Page', title: 'Business Service Health', subtitle: 'Full service relationship chain', path: '/applications/business-service-health', tags: ['service', 'chain', 'relationship'] },
    { id: 'NAV-06', type: 'Page', title: 'Technology Dependency Map', subtitle: 'Interactive graph visualization', path: '/applications/dependency-map', tags: ['dependency', 'map', 'graph'] },
    { id: 'NAV-07', type: 'Page', title: 'Resource Roster', subtitle: 'Tower staff list, certifications, availability', path: '/operations/resource-roster', tags: ['people', 'roster', 'staff'] },
    { id: 'NAV-08', type: 'Page', title: 'Risk Management', subtitle: 'Enterprise risk heatmap & register', path: '/governance/risks', tags: ['risk', 'heatmap', 'mitigation'] },
    { id: 'NAV-09', type: 'Page', title: 'Unified Approvals', subtitle: 'Leave, Access, Procurement, Change approvals', path: '/governance/approvals', tags: ['approvals', 'change', 'requests'] },
    { id: 'NAV-10', type: 'Page', title: 'FinOps & Cloud Economics', subtitle: 'GCP & Azure cloud spend & recommendations', path: '/finops', tags: ['cloud', 'finops', 'gcp', 'azure', 'spend'] },
    { id: 'NAV-11', type: 'Page', title: 'Knowledge Base', subtitle: 'SOPs, Runbooks & Architecture documentation', path: '/knowledge', tags: ['sop', 'runbook', 'kb', 'docs'] },
  ];
  items.push(...pages);

  // Technology
  technologyPlatforms.forEach((p) => {
    items.push({
      id: p.id,
      type: 'Technology',
      title: p.name,
      subtitle: `${p.category} · ${p.health.toUpperCase()}`,
      path: '/technology/estate',
      tags: [p.name, p.category, p.owner, p.source, ...(p.modules || [])],
    });
  });

  // Incidents
  incidents.forEach((inc) => {
    items.push({
      id: inc.id,
      type: 'Incident',
      title: `${inc.id}: ${inc.title}`,
      subtitle: `${inc.priority} · ${inc.service} · ${inc.status}`,
      path: '/service-management/critical-incidents',
      tags: [inc.id, inc.priority, inc.service, inc.owner, inc.relatedCI],
    });
  });

  // Exceptions
  managementExceptions.forEach((exc) => {
    items.push({
      id: exc.id,
      type: 'Exception',
      title: exc.title,
      subtitle: `${exc.severity.toUpperCase()} · ${exc.relatedService}`,
      path: '/',
      tags: [exc.id, exc.severity, exc.relatedService, exc.relatedTechnology, exc.owner],
    });
  });

  // Business Services
  businessServices.forEach((svc) => {
    items.push({
      id: svc.id,
      type: 'Service',
      title: svc.name,
      subtitle: `${svc.criticality} · ${svc.category}`,
      path: '/applications/business-service-health',
      tags: [svc.id, svc.name, svc.owner, svc.vendor],
    });
  });

  // Applications
  applicationsList.forEach((app) => {
    items.push({
      id: app.id,
      type: 'Application',
      title: app.name,
      subtitle: `${app.vendor} · ${app.serviceName}`,
      path: '/applications/health',
      tags: [app.id, app.name, app.vendor, app.techStack],
    });
  });

  // Risks
  risksList.forEach((rsk) => {
    items.push({
      id: rsk.id,
      type: 'Risk',
      title: `${rsk.id}: ${rsk.description}`,
      subtitle: `${rsk.impact} Impact · ${rsk.tower}`,
      path: '/governance/risks',
      tags: [rsk.id, rsk.tower, rsk.owner, rsk.impact],
    });
  });

  // Approvals
  approvalsList.forEach((apr) => {
    items.push({
      id: apr.id,
      type: 'Approval',
      title: `${apr.id}: ${apr.title}`,
      subtitle: `${apr.category} · ${apr.requester}`,
      path: '/governance/approvals',
      tags: [apr.id, apr.category, apr.requester, apr.approver],
    });
  });

  // Vendors
  vendorsList.forEach((v) => {
    items.push({
      id: v.id,
      type: 'Vendor',
      title: v.name,
      subtitle: `${v.serviceProvided} · SLA ${v.slaPerformance}`,
      path: '/governance/vendors',
      tags: [v.id, v.name, v.serviceProvided, v.annualValue],
    });
  });

  // Initiatives
  initiativesList.forEach((init) => {
    items.push({
      id: init.id,
      type: 'Initiative',
      title: init.name,
      subtitle: `${init.category} · ${init.status}`,
      path: '/transformation/automation',
      tags: [init.id, init.name, init.category, init.tower, init.owner],
    });
  });

  // Knowledge Docs
  knowledgeDocs.forEach((kb) => {
    items.push({
      id: kb.id,
      type: 'Knowledge',
      title: kb.title,
      subtitle: `${kb.category} · ${kb.version} · ${kb.owner}`,
      path: '/knowledge',
      tags: [kb.id, kb.title, kb.category, ...kb.tags],
    });
  });

  return items;
};

export const allSearchableItems = buildSearchIndex();

export const fuseSearch = new Fuse(allSearchableItems, {
  keys: ['title', 'subtitle', 'type', 'tags'],
  threshold: 0.35,
});

export const searchPortalEntities = (query: string, maxResults = 10): SearchableEntity[] => {
  if (!query || query.trim() === '') return allSearchableItems.slice(0, maxResults);
  const results = fuseSearch.search(query);
  return results.map((r) => r.item).slice(0, maxResults);
};
