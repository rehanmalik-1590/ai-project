import { useState, useEffect } from 'react';

const ImageGenerator = ({ triggerGlitch }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return 90;
          return prev + Math.random() * 10;
        });
      }, 300);
      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setImageUrl('');
    try {
      const response = await fetch(`http://localhost:8080/generate-image?prompt=${encodeURIComponent(prompt)}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      // Try to parse the actual image URL from the JSON body
      const data = await response.json();
      const imageUrl = data.imageUrl; // Expecting { imageUrl: "http://..." }

      if (!imageUrl) {
        throw new Error('Image URL not found in response');
      }

      setImageUrl(imageUrl);
      triggerGlitch();
    } catch (error) {
      console.error("Error generating image:", error);
      triggerGlitch();
    } finally {
      setIsLoading(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `nexus-gen-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerGlitch();
  };

  return (
    <div className="space-y-6">
      <div className="holo-display bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-900/30 border border-purple-400/20 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">
            IMAGE GENERATOR
          </h2>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe visual parameters..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 rounded-lg text-gray-200 placeholder-gray-500 transition-all duration-300"
              onKeyPress={(e) => e.key === 'Enter' && generateImage()}
            />
          </div>
          <button
            onClick={generateImage}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-lg disabled:opacity-50 flex items-center space-x-2 transition-all duration-300 group"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span>RENDERING</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>GENERATE</span>
              </>
            )}
          </button>
        </div>

        {isLoading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>NEURAL RENDERING IN PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {imageUrl && (
          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-full max-w-md h-96 border-2 border-gray-700 rounded-xl overflow-hidden group">
              <img 
                src={imageUrl} 
                alt="AI generated hologram" 
                className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <button
                  onClick={downloadImage}
                  className="w-full py-2 bg-gray-900/90 border border-gray-700 text-gray-200 rounded-lg flex items-center justify-center space-x-2 font-medium hover:bg-gray-800 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>DOWNLOAD</span>
                </button>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              RESOLUTION: 512×512px | FORMAT: PNG | SOURCE: MALIK-AI
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
