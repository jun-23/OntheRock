import { useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

export const Analyze = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('업로드 할 비디오 파일을 선택해주세요.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('video_file', selectedFile);

    try {
      const response = await fetch('https://ontherock.lol:8095/process_video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('영상 분석을 실패했습니다.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'processed_image.png');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsLoading(false);

    } catch (error) {
      console.error('Error processing the video:', error);
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <div className='m-[3vh] mt-[19vh]'>
      <h1 className='text-2xl font-display text-textBlack mb-[3vh] ml-1'>영상 분석</h1>
      <div className="mb-4 border-[2px] border-secondary rounded-[2vh] p-3">
        <div className="flex items-center">
          <label className="bg-secondary text-white px-2 py-1 rounded-lg cursor-pointer">
            파일 선택
            <input 
              type="file" 
              accept="video/mp4" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </label>
          <span className="ml-3 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
            {selectedFile ? selectedFile.name : '선택된 파일 없음'}
          </span>
        </div>
      </div>
      <div className='flex flex-col justify-end items-center'>
        {isLoading ? 
          <ClimbingBoxLoader 
            color="#8090BF"
            size={12}
            speedMultiplier={0.8}
          /> : null
        }
        <button 
          className={`bg-secondary text-lg text-white p-2 mt-3 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? '분석 중...' : '영상 분석하기'}
        </button>
      </div>
    </div>
  );
}

export default Analyze;
