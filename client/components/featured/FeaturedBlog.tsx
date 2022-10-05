import axios from 'axios';
export const FeaturedBlog = () => {
  
  const handleClick = async () => {
    const creds = {
      name: "Blogname",
      position: "Test",
      level: "leveltest"
    }
    const res = await axios.post("http://localhost:5000/blog/add", creds);
    console.log(res);
    
  }

  return (
    <div>
      <button onClick={handleClick}>Clickme</button>
    </div>
  );
};
