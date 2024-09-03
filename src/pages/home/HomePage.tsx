import CoverPhoto from '../../assets/homePage/cover_photo.jpg';

export const HomePage = () => {
  return (
    <div className={'flex flex-col xl:flex-row xl:h-80vh md:h-screen xl:pt-20 md:pt-5'}>
      <div className={'w-full xl:w-1/2 p-5 xl:pl-20 xl:pr-10 flex items-center justify-center'}>
        <div>
          <h1 className={'text-xl'}>This is A demo application</h1>
          <h2 className={'mt-1 text-xl'}>Made By Filip Todorović for Mono</h2>
          <p className={'mt-10 text-base'}>This is a Car shop App that simply shows CRUD functionality with all other frontend tools that makes a good user experience</p>
          <p className={'mt-2 text-base'}>In the Navigation Bar we have the Vehicle List that shows all the cars we have in our DataBase with the key MakeId which is simply the id of the maker of the vehicle</p>
          <p className={'mt-2 text-base'}>After that we have the car makers in which we can create a new Car maker like Ford or BMW and create a new car model which has the makers key</p>
          <p className={'mt-2 text-base'}>For this application, I will limit myself to only the values I need to type in and I will ignore some features I would like to implement at some time like the car makers logo and maybe some images of the car and a system that represents buying or selling cars</p>
        </div>
      </div>

      <div className={'w-full  xl:pr-20 p-5 flex items-center justify-center'}>
        <img
          className={'w-full h-auto rounded-md opacity-90 object-cover'}
          src={CoverPhoto}
          alt="Cover"
        />
      </div>
    </div>
  );
}
