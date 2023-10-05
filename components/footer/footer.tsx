// Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <p>&copy; {new Date().getFullYear()} Proghaven</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
