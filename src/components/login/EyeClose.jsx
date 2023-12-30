function EyeClose({onClick}){
    return(
      <>
        <div onClick={onClick} className="cursor-pointer">
        <i class="fa-regular fa-eye-slash"></i>
        </div>
      </>
    ) 
  }

  export default EyeClose;