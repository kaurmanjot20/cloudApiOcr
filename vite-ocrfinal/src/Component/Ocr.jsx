import { useState } from 'react';
import axios from 'axios';

function Ocr() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      const apiKey = import.meta.env.VITE_GOOGLE_VISION_API_KEY;

      try {
        const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
          requests: [
            {
              image: {
                content: base64String,
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                },
              ],
            },
          ],
        });

        const extractedText = response.data.responses[0]?.textAnnotations[0]?.description || "No text detected";
        setText(extractedText);
      } catch (error) {
        console.error('Error extracting text:', error);
        setText('Error extracting text');
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="ocr-container">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="ocr-input" />
      {loading ? (
        <div className="ocr-loading">Loading...</div>
      ) : (
        <div className="ocr-text">
          {text.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ocr;
