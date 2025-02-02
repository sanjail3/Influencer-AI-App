const GradientSpinner = () => {
    return (
      <div className="w-6 h-6 rounded-full animate-spin border-2 border-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-400">
        <div className="w-full h-full rounded-full bg-slate-900/30 backdrop-blur-sm" />
      </div>
    );
  };
  
 export default GradientSpinner;