export interface Domain {
  id: string;
  name: string;
  primaryDomain: string;
  customDomain?: string;
  status: 'active' | 'pending' | 'failed';
  sslEnabled: boolean;
  verificationStatus: 'verified' | 'pending' | 'failed';
  dnsRecords: DnsRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface DnsRecord {
  type: 'A' | 'CNAME' | 'TXT' | 'MX';
  host: string;
  value: string;
  ttl: number;
  priority?: number;
}

export interface DomainFormData {
  name: string;
  customDomain: string;
  sslEnabled: boolean;
} 