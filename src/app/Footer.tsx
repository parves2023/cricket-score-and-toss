import { FaFacebookSquare } from "react-icons/fa"; // Import the Facebook icon from React Icons

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center text-xs">
        <p>
          Made with love by 
          <a
            href="https://www.facebook.com/profile.php?id=100055235052516"
            className="text-blue-400 hover:underline flex items-center justify-center"
          >
            <FaFacebookSquare className="mr-2" />
            Anamul Hauqe Parves
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
