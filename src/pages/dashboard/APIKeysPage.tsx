import { useState } from 'react';
import { Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: number;
  lastUsed: number;
  requests: number;
}

const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production',
    key: 'pk_live_1234567890abcdef1234567890abcdef',
    created: Date.now() - 86400000 * 30,
    lastUsed: Date.now() - 3600000,
    requests: 12453
  },
  {
    id: '2',
    name: 'Development',
    key: 'pk_test_abcdef1234567890abcdef1234567890',
    created: Date.now() - 86400000 * 60,
    lastUsed: Date.now() - 7200000,
    requests: 3421
  },
];

export function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API key copied to clipboard!');
  };

  const deleteKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(prev => prev.filter(k => k.id !== id));
    }
  };

  const maskKey = (key: string) => {
    return key.slice(0, 12) + '••••••••••••••••••••' + key.slice(-4);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600 mt-1">Manage your API keys for authentication</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
        >
          <Plus size={20} />
          Create New Key
        </button>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> Keep your API keys secure. Never share them publicly or commit them to version control.
        </p>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created {new Date(apiKey.created).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => deleteKey(apiKey.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* API Key */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-sm text-gray-900">
                  {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                </code>
                <button
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {visibleKeys.has(apiKey.id) ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Last Used</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(apiKey.lastUsed).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Requests</p>
                <p className="text-sm font-medium text-gray-900">
                  {apiKey.requests.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {apiKeys.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No API keys yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            <Plus size={20} />
            Create Your First Key
          </button>
        </div>
      )}

      {/* Create Modal (simplified) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New API Key</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Production, Development"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('API key created! (Mock)');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
