import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { StatusChip } from '@/components/ui/status-chip';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, ShieldCheck, Link2 } from 'lucide-react';
import { mockAuditLogs } from '@/services/mockData';
import { AuditLog } from '@/types';

const entities = ['Employee', 'Leave', 'Review', 'Document', 'System'] as const;

export default function AuditLogs() {
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter(log => {
      const matchesEntity = entityFilter === 'all' || log.entityType === entityFilter;
      const matchesSearch = 
        log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter);
      return matchesEntity && matchesSearch && matchesDate;
    });
  }, [entityFilter, searchQuery, dateFilter]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'actor', header: 'Actor' },
    { key: 'action', header: 'Action' },
    {
      key: 'entityType',
      header: 'Entity',
      render: (log: AuditLog) => (
        <div className="flex items-center gap-2">
          <span>{log.entityType}</span>
          {log.entityId && (
            <span className="text-xs text-muted-foreground">({log.entityId})</span>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (log: AuditLog) => (
        <StatusChip status={log.status} type={log.status === 'Success' ? 'success' : 'error'} />
      )
    },
    {
      key: 'verified',
      header: 'Blockchain',
      render: (log: AuditLog) => (
        log.verified ? (
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground font-mono">{log.blockchainTxId}</span>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Not verified</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
        <p className="text-muted-foreground mt-1">
          View blockchain-verified audit trail of all system actions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Link2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{mockAuditLogs.length}</p>
              <p className="text-sm text-muted-foreground">Total Logs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {mockAuditLogs.filter(l => l.verified).length}
              </p>
              <p className="text-sm text-muted-foreground">Blockchain Verified</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
              <Filter className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{filteredLogs.length}</p>
              <p className="text-sm text-muted-foreground">Filtered Results</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card className="bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by actor or action..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <Select value={entityFilter} onValueChange={(v) => { setEntityFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  {entities.map(entity => (
                    <SelectItem key={entity} value={entity}>{entity}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
                className="w-40"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={paginatedLogs}
            columns={columns}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
