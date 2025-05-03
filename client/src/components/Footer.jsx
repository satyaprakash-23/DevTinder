const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 w-full ">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="mb-2 sm:mb-0">
            <p>&copy; {new Date().getFullYear()} ACME Industries Ltd. All rights reserved.</p>
          </div>
  
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms</a>
            <a href="#" className="hover:text-gray-300 transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  