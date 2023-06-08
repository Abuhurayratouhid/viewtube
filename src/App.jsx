import './App.css'
import { useState, useEffect } from 'react';


const API_KEY = 'AIzaSyDAF9LxX8smoQ5hf_dTI4eWRZWxjne02Xw';
const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=${API_KEY}`;

// console.log(API_URL)

function App() {

  // after fetching the data video will store in this state
  const [videos, setVideos] = useState([]);


  //
  const handleSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;
    // console.log('clicked', query)

    // fetch the video based on query
    try {
      const response = await fetch(API_URL + `&q=${query}`);
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }


  // whenever page loaded 
  useEffect(() => {
    // Fetch video data from YouTube API
    const fetchVideos = async () => {
      try {
        const response = await fetch(API_URL + '&q=nature');
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);


  // this function allows to play the video dynamically in a new tab
  const playVideo = (videoId) => {

    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');

  };

  return (
    <>
    {/* header  */}
      <div className='w-full'>
        <div className='w-full h-20  lg:px-10 bg-black flex justify-between items-center'>
          <div className="div">
            <h1 className='text-red-900 text-xl font-bold ml-2'>ViewTube</h1>
            {/* <img className='w-10 h-7 lg:w-20 lg:h-16 rounded-full' src="../src/assets/logo.jpg" alt="logo" /> */}
          </div>
          <div className="div">
            <form onSubmit={handleSearch}>
              <input className='px-2 lg:py-2 lg:px-5 bg-[#2d3139] text-white rounded-md' type="text" name="search" id="search" placeholder='Search here' />
              <button type='submit' className='bg-white px-2 lg:py-2 lg:px-5 rounded-md ml-[-10px] mr-2'>Search</button>
            </form>
          </div>
        </div>
      </div>

      {/* loaded video will display here */}
      <div className='grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-10'>

        {videos?.map((video) => (
          <div
            className='bg-[#161a1d] w-full h-72 text-[#e5e5e5] rounded-md'
            key={video.id.videoId}
            onClick={() => playVideo(video.id.videoId)}>
            <img className='w-full h-[60%] rounded-md' src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <div className='p-2'>
              <p className='text-sm'>{video.snippet.channelTitle}</p>
              <h2 className='text-xl'>{video.snippet.title.slice(0, 80)}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
