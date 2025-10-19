'use client';

import { useEffect } from 'react';
import type { EmailVerificationDetail } from '@/types/user';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  verification: EmailVerificationDetail | null;
}

export default function VerificationModal({
  isOpen,
  onClose,
  verification,
}: VerificationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !verification) return null;

  const isValid = verification.verification.isValid;
  const wasModified = verification.verification.lastModified !== null;
  const hasOriginalEmail = verification.verification.originalEmail !== null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-900">Email Verification Details</h2>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Main Status */}
          <div
            className={`p-4 rounded-md ${
              isValid
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                isValid ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {verification.message}
            </p>
          </div>

          {/* Warning for Modified Email */}
          {wasModified && hasOriginalEmail && (
            <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Email Modified</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    This email was changed from{' '}
                    <span className="font-mono font-semibold">
                      {verification.verification.originalEmail}
                    </span>{' '}
                    to{' '}
                    <span className="font-mono font-semibold">{verification.email}</span>.
                    The original signature is no longer valid for the current email.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                User ID
              </label>
              <p className="text-sm text-gray-900">{verification.userId}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Email
              </label>
              <p className="text-sm text-gray-900 break-all">{verification.email}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Algorithm
              </label>
              <p className="text-sm text-gray-900">{verification.verification.algorithm}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Signed At
              </label>
              <p className="text-sm text-gray-900">
                {new Date(verification.verification.signedAt).toLocaleString()}
              </p>
            </div>

            {verification.verification.lastModified && (
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                  Last Modified
                </label>
                <p className="text-sm text-gray-900">
                  {new Date(verification.verification.lastModified).toLocaleString()}
                </p>
              </div>
            )}

            {verification.verification.originalEmail && (
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                  Original Email
                </label>
                <p className="text-sm text-gray-900 break-all">
                  {verification.verification.originalEmail}
                </p>
              </div>
            )}
          </div>

          {verification.verification.emailHash && (
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Email Hash (SHA-384)
              </label>
              <p className="text-xs text-gray-900 font-mono bg-gray-50 p-2 rounded border border-gray-200 break-all">
                {verification.verification.emailHash}
              </p>
            </div>
          )}

          {verification.verification.emailSignature && (
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Digital Signature
              </label>
              <p className="text-xs text-gray-900 font-mono bg-gray-50 p-2 rounded border border-gray-200 break-all max-h-32 overflow-y-auto">
                {verification.verification.emailSignature}
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
