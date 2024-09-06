import authStore from "../../stores/AuthStore.ts";

export const ProfilePage = () => {
  const { user } = authStore;

  if (!user) {
    return <div>Please log in to see your profile.</div>;
  }
  console.log(user);

  return (
    <div className="container mx-auto mt-20 p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
      <h1>Welcome To Your Profile page</h1>
      <div className=" flex flex-col items-start justify-start  gap-2 mt-10 mb-10">
        <p><span className={'font-bold text-black'}>User Name:</span> {user?.displayName || ''}</p>
        <p><span className={'font-bold text-black'}>Email:</span> {user?.email}</p>
        <p><span className={'font-bold text-black'}>Email Verified:</span> {user?.emailVerified ? 'true' : 'false' || ''}</p>
        <p><span className={'font-bold text-black'}>Anonymous:</span>  {user?.isAnonymous ? 'true' : 'false' || ''}</p>
      </div>
      <div className={'gap-2 flex flex-col'}>
        <h2 className={'text-lg font-bold text-purple-900'}>Meta Data</h2>
        <p><span className={'font-bold text-black'}>Date Created: </span>{user?.metadata?.creationTime || ''}</p>
        <p><span className={'font-bold text-black'}>Last Signed in: </span>{user?.metadata?.lastSignInTime || ''}</p>
      </div>
    </div>

  );
};
