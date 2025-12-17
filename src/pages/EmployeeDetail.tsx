import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusChip } from '@/components/ui/status-chip';
import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, Download, Eye, User, Briefcase, FileText, Clock } from 'lucide-react';
import { mockEmployees, mockDocuments, mockHistory } from '@/services/mockData';

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const employee = useMemo(() => 
    mockEmployees.find(e => e.id === id),
    [id]
  );

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">This feature is coming soon. You will be able to edit profile details here.</p>
        <Button variant="link" onClick={() => navigate('/employees')}>
          Back to Directory
        </Button>
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Hired': return <User className="h-4 w-4" />;
      case 'Promoted': return <Briefcase className="h-4 w-4" />;
      case 'Role Change': return <Briefcase className="h-4 w-4" />;
      case 'Award': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="gap-2 -ml-2"
        onClick={() => navigate('/employees')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Directory
      </Button>

      {/* Employee Header */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {employee.firstName[0]}{employee.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-card-foreground">
                  {employee.firstName} {employee.lastName}
                </h1>
                <StatusChip status={employee.status} />
              </div>
              <p className="text-muted-foreground mt-1">{employee.role}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {employee.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {employee.city}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edit Profile</Button>
              <Button>Send Message</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-card border">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-card-foreground mt-1">{employee.firstName} {employee.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-card-foreground mt-1">{employee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <p className="text-card-foreground mt-1">{employee.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="text-card-foreground mt-1">{employee.address || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">City</label>
                  <p className="text-card-foreground mt-1">{employee.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                  <p className="text-card-foreground mt-1">{employee.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employment Tab */}
        <TabsContent value="employment">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-card-foreground mt-1">{employee.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-card-foreground mt-1">{employee.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Manager</label>
                  <p className="text-card-foreground mt-1">{employee.manager || 'N/A'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employment Type</label>
                  <p className="text-card-foreground mt-1">{employee.employmentType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                  <p className="text-card-foreground mt-1">{employee.joiningDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <StatusChip status={employee.status} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documents</CardTitle>
              <Button variant="outline" size="sm">Upload Document</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border bg-background">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Employment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6">
                  {mockHistory.map((event, index) => (
                    <div key={event.id} className="relative flex gap-4 pl-10">
                      <div className="absolute left-0 p-2 bg-card border rounded-full">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2">
                          <StatusChip 
                            status={event.type} 
                            type={event.type === 'Hired' ? 'success' : event.type === 'Award' ? 'info' : 'neutral'} 
                          />
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-card-foreground mt-2">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
