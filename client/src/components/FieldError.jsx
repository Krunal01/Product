const FieldError = ({ error, touched }) => {
  if (touched !== undefined) {
    if (!touched || !error) return null;
  } else {
    if (!error) return null;
  }

  return <span className="text-red-400">{error}</span>;
};

export default FieldError;
