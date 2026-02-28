import { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';

// Mock data - replace with real API
const mockVerifications = [
  {
    id: 'cert_1',
    fileHash: 'a1b2c3d4e5f6789012345678901234567890',
    verdict: 'VERIFIED_ORGANIC',
    confidence: 0.96,
    timestamp: Date.now() - 300000,
    fileType: 'video/mp4',
    certificateId: 'cert_abc123'
  },
  {
    id: 'cert_2',
    fileHash: 'f6e5d4c3b2a1098765432109876543210987',
    verdict: 'SYNTHETIC_DETECTED',
    confidence: 0.89,
    timestamp: Date.now() - 600000,
    fileType: 'image/jpeg',
    certificateId: 'cert_def456'
  },
  {
    id: 'cert_3',
    fileHash: '1a2b3c4d5e6f7890abcdef1234567890abcd',
    verdict: 'VERIFIED_ORGANIC',
    confidence: 0.94,
    timestamp: Date.now() - 900000,
    fileType: 'video/webm',
    certificateId: 'cert_ghi789'
  },
  {
    id: 'cert_4',
    fileHash: '6f5e4d3c2b1a0987fedcba0987654321fedc',
    verdict: 'VERIFIED_ORGANIC',
    confidence: 0.98,
    timestamp: Date.now() - 1200000,
    fileType: 'image/png',
    certificateId: 'cert_jkl012'
  },
  {
    id: 'cert_5',
    fileHash: 'abcdef1234567890abcdef1234567890abcd',
    verdict: 'INCONCLUSIVE',
    confidence: 0.72,
    timestamp: Date.now() - 1500000,
    fileType: 'video/mp4',
    certificateId: 'cert_mno345'
  },
];

export function VerificationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState<string>('all');

  const filteredVerifications = mockVerifications.filter(v => {
    const matchesSearch = v.fileHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterVerdict === 'all' || v.verdict === filterVerdict;
    return matchesSearch && matchesFilter;
  });

  const handleDownloadCertificate = (certificateId: string) => {
    console.log('Downloading certificate:', certificateId);
    // TODO: Implement actual download
    alert(`Downloading certificate ${certificateId}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Verifications</h1>
        <p className="text-gray-400 mt-1">View and manage all your verification history</p>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by file hash or certificate ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterVerdict}
              onChange={(e) => setFilterVerdict(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Verdicts</option>
              <option value="VERIFIED_ORGANIC">Verified</option>
              <option value="SYNTHETIC_DETECTED">Synthetic</option>
              <option value="INCONCLUSIVE">Inconclusive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  File Hash
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Verdict
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVerifications.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(v.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-gray-600">
                      {v.fileHash.slice(0, 16)}...
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {v.fileType.split('/')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      v.verdict === 'VERIFIED_ORGANIC' 
                        ? 'bg-green-100 text-green-700'
                        : v.verdict === 'SYNTHETIC_DETECTED'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {v.verdict === 'VERIFIED_ORGANIC' ? '✓ Verified' : 
                       v.verdict === 'SYNTHETIC_DETECTED' ? '✗ Synthetic' : '? Inconclusive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(v.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDownloadCertificate(v.certificateId)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
                    >
                      <Download size={16} />
                      Certificate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredVerifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No verifications found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredVerifications.length} of {mockVerifications.length} verifications
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
