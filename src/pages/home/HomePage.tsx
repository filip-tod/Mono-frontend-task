import CoverPhoto from '../../assets/homePage/cover_photo.jpg';

export const HomePage = () => {
  return (
    <div className={'flex flex-col xl:flex-row xl:h-screen md:h-screen xl:pt-20 md:pt-5'}>
      <div className={'w-full xl:w-1/2 p-5 xl:pl-20 xl:pr-10 flex items-center justify-center'}>
        <div>
          <h1 className={'text-xl font-bold'}>Welcome to the Garage App</h1>
          <h2 className={'mt-1 text-xl'}>Created by Filip Todorović for Mono</h2>
          <p className={'mt-10 text-base'}>
            This is a simple web application where I demonstrate my knowledge of React, state management,
            and working with API calls. It allows users to manage car brands and their associated car models.
          </p>
          <p className={'mt-2 text-base'}>
            The application features basic CRUD (Create, Read, Update, Delete) operations, enabling the addition,
            modification, and deletion of car brands and models in a structured way.
          </p>
          <p className={'mt-2 text-base'}>
            In the Car Models section, you can see all the cars we have stored, each connected to a specific car maker.
            You can also navigate to the Car Makers section to add new brands (e.g., Ford, BMW) and associate car models with them.
          </p>
          <p className={'mt-2 text-base'}>
            While the current version focuses on core functionality, in the future, I plan to expand it with features
            like adding car images, logos, and even a basic "shop" system where users can simulate buying and selling cars.
          </p>
          <p className={'mt-2 text-base'}>
            Overall, this project is a way to show how React, MobX, Tailwind CSS and API integrations can be used to create a functional,
            interactive user interface.
          </p>
        </div>
      </div>

      <div className={'w-full xl:pr-20 p-5 flex items-center  justify-center'}>
        <img
          className={'w-full h-auto max-h-[70vh] rounded-md object-contain'}
          src={CoverPhoto}
          alt="Cover"
        />
      </div>
    </div>
  );
}
