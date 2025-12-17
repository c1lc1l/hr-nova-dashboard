import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Settings, Plus } from 'lucide-react';
import { mockRolePermissions } from '@/services/mockData';
import { AppRole, Module, RolePermission } from '@/types';
import { useToast } from '@/hooks/use-toast';

const modules: Module[] = ['Core HR', 'Leave', 'Performance', 'Dashboard', 'Audit'];

export default function AdminPage() {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<RolePermission[]>(mockRolePermissions);
  const [newRoleName, setNewRoleName] = useState('');
  const [settings, setSettings] = useState({
    reviewCycleLength: 90,
    autoApproveLeave: false,
    requireManagerApproval: true,
    enableAuditTrail: true
  });

  const handlePermissionChange = (role: AppRole, module: Module, value: boolean) => {
    setPermissions(prev => prev.map(p => 
      p.role === role 
        ? { ...p, permissions: { ...p.permissions, [module]: value } }
        : p
    ));
    toast({
      title: 'Permission Updated',
      description: `${module} access ${value ? 'granted' : 'revoked'} for ${role}`,
    });
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a role name',
        variant: 'destructive'
      });
      return;
    }

    const newRole: RolePermission = {
      role: newRoleName as AppRole,
      permissions: {
        'Core HR': false,
        'Leave': false,
        'Performance': false,
        'Dashboard': true,
        'Audit': false
      }
    };

    setPermissions([...permissions, newRole]);
    setNewRoleName('');
    toast({
      title: 'Role Added',
      description: `${newRoleName} role has been created.`,
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'System settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">System Administration</h1>
        <p className="text-muted-foreground mt-1">
          Manage roles, permissions, and system settings.
        </p>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="bg-card border">
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            Roles & Access
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            System Settings
          </TabsTrigger>
        </TabsList>

        {/* Roles & Access Tab */}
        <TabsContent value="roles" className="space-y-6">
          {/* Add Role */}
          {/* <Card className="bg-card">
            <CardHeader>
              <CardTitle>Add New Role</CardTitle>
              <CardDescription>Create a new role with custom permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter role name..."
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="max-w-sm"
                />
                <Button onClick={handleAddRole} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Role
                </Button>
              </div>
            </CardContent>
          </Card> */}

          {/* Permission Matrix */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Configure module access for each role.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-card-foreground">Role</th>
                      {modules.map((module) => (
                        <th key={module} className="text-center py-3 px-4 font-semibold text-card-foreground">
                          {module}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm) => (
                      <tr key={perm.role} className="border-b last:border-b-0">
                        <td className="py-3 px-4 font-medium text-card-foreground">{perm.role}</td>
                        {modules.map((module) => (
                          <td key={module} className="text-center py-3 px-4">
                            <Checkbox
                              checked={perm.permissions[module]}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(perm.role, module, checked as boolean)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure global system preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Review Cycle Length (days)</Label>
                    <Input
                      type="number"
                      value={settings.reviewCycleLength}
                      onChange={(e) => setSettings({ ...settings, reviewCycleLength: parseInt(e.target.value) })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Default duration for performance review cycles.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-background">
                    <div>
                      <p className="font-medium text-card-foreground">Auto-approve Leave</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically approve leave requests under 3 days.
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoApproveLeave}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoApproveLeave: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-background">
                    <div>
                      <p className="font-medium text-card-foreground">Require Manager Approval</p>
                      <p className="text-sm text-muted-foreground">
                        All leave requests require manager approval.
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireManagerApproval}
                      onCheckedChange={(checked) => setSettings({ ...settings, requireManagerApproval: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-background">
                    <div>
                      <p className="font-medium text-card-foreground">Enable Audit Trail</p>
                      <p className="text-sm text-muted-foreground">
                        Record all system actions for compliance.
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableAuditTrail}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableAuditTrail: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
