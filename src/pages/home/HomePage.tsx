import CoverPhoto from '../../assets/homePage/cover_photo.jpg';

export const HomePage = () => {
    return(
      <div className={'flex h-80vh w-screen pt-20'}>
        <div className={'w-full pl-20 pr-10'}>
          <h1 className={'text-xl'}>This is A demo application</h1>
          <h2 className={'mt-1 text-xl'}>Made By Filip Todorović for Mono</h2>
          <p className={'mt-10 text-base'}>This is a Car shop App that simply shows CRUD functionality with all other frontend tools that makes a good user experience</p>
          <p className={'mt-2 text-base'}>In the Navigation Bar we have the Vehicle List that show's all the cars we have in our DataBase with the key MakeId witch is simply the id of the maker of the vehicle</p>
          <p className={'mt-2 text-base'}>after that we have the car makers in witch we can create a new Car maker like Ford or BMW and create a new car model witch hase the makers key</p>
          <p className={'mt-2 text-base'}>for this application i will limit my self to only the values i need to type in and i will ignore some features i would like to implement at some time like the car makers logo and maybe some images of the car and a system that represents buying or selling cars</p>
        </div>

        <div className={'justify-start items-start w-full pr-10 pl-10 '}>
          <img
            className={'w-full h-full rounded-md opacity-90'}
            src={CoverPhoto}
          />

        </div>
      </div>
    );
}