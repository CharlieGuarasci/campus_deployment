import { useNavigate } from 'react-router-dom';

const BookCard = ({ id, title, course_code, price, condition, image, author, edition }) => {
  const navigate = useNavigate();

  // Condition color mapping
  const conditionColors = {
    GOOD: "bg-green-100 text-green-800",
    FAIR: "bg-yellow-100 text-yellow-800",
    POOR: "bg-red-100 text-red-800",
  };

  // Handle image URL
  const placeholderImage = "/placeholder.png";
  const imageUrl = image ? `http://localhost:8000/media/${image.split('/media/')[1]}` : placeholderImage;

  const handleClick = () => {
    console.log('Navigating to listing:', id);
    navigate(`/listing/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="border p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-black transition-all duration-200 bg-white relative group cursor-pointer"
    >
      {/* Image Section */}
      <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Course Code */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{course_code}</h3>

      {/* Title and Author */}
      <div className="mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        {author && <p className="text-sm text-gray-500">{author}</p>}
        {edition && <p className="text-xs text-gray-400">Edition: {edition}</p>}
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-emerald-600 mb-2">${price}</p>

      {/* Condition Badge */}
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${conditionColors[condition.toUpperCase()]}`}>
        {condition}
      </span>
    </div>
  );
};

export default BookCard;
