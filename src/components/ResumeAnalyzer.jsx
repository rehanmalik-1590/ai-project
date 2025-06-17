import { useState } from 'react';

const ResumeAnalyzer = ({ triggerGlitch }) => {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysisResult('');
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('location', location);

    try {
      const response = await fetch('http://localhost:8080/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.text();
      setAnalysisResult(data);
      triggerGlitch();
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setAnalysisResult("SYSTEM ERROR: Neural analysis failed. Please try again.");
      triggerGlitch();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="cyber-panel bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-900/30 border border-green-400/20 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">
            RESUME ANALYZER
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="upload-area border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-green-400 transition-all duration-300">
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="text-green-400 font-medium mb-1">
                    {file ? file.name : 'UPLOAD RESUME'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {file ? 'Click to change' : 'PDF format only'}
                  </div>
                </div>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                TARGET GEO-LOCATION
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city/country for job matches"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-green-400 focus:ring-1 focus:ring-green-400/30 rounded-lg text-gray-200 placeholder-gray-500 transition-all duration-300"
              />
            </div>

            <button
              onClick={analyzeResume}
              disabled={isLoading || !file}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white rounded-lg disabled:opacity-50 flex items-center justify-center space-x-2 transition-all duration-300 group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>ANALYZING</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span>INITIATE SCAN</span>
                </>
              )}
            </button>
          </div>

          <div className="analysis-results bg-gray-800/50 border border-gray-700 rounded-lg p-4 overflow-auto">
            {analysisResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                  <h3 className="text-green-400 font-medium">ANALYSIS COMPLETE</h3>
                  <div className="text-xs text-gray-400">v2.3.7</div>
                </div>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">{analysisResult}</pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-500 mb-2">NO ANALYSIS DATA</div>
                  <div className="text-xs text-gray-600">Upload a resume to begin neural analysis</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;