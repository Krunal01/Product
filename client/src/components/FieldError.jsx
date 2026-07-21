const FieldError = ({ error, touched }) => {
  if (!touched || !error) return null;

  return <span className="text-red-400">{error}</span>;
};

export default FieldError;
