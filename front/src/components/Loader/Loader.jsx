import spinner from '../../../public/spinner.svg'

 const Loader = () => {
  return (
    <div className="flex justify-center items-center">
        <img src={spinner} alt='Loading...' />
        </div>
  );
};
 export default Loader