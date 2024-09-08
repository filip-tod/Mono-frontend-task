import { useParams, useNavigate } from "react-router-dom";
import { useFetchVehicleModel } from "../../hooks/useFetchVehicleModel";
import {useFetchVehicleMakes} from "../../hooks/useFetchVheicleMakes.ts";
import {useUpdateVehicleModel} from "../../hooks/useUpdateVehicleModel.ts";

const EditCarPage = () => {
    const { id } = useParams<{ id: string }>();
    const { vehicleModel, loading: modelLoading, error: modelError, setVehicleModel } = useFetchVehicleModel(id);
    const { makes, loading: makesLoading, error: makesError } = useFetchVehicleMakes();
    const { updateVehicleModel, loading: updateLoading, error: updateError } = useUpdateVehicleModel();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVehicleModel(prevModel => prevModel ? { ...prevModel, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vehicleModel || !id) return;

        try {
            await updateVehicleModel(id, vehicleModel);
            navigate('/cars');
        } catch (error) {
            console.error("Failed to update vehicle model.", error);
        }
    };

    if (modelLoading || makesLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (modelError || makesError) {
        return <div className="flex items-center justify-center h-screen">Error loading data</div>;
    }

    return (
      <div className="flex flex-col items-center justify-center  p-4">
          <div className="w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Car</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label htmlFor="Name" className="block">Name</label>
                      <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={vehicleModel?.Name || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded"
                      />
                  </div>
                  <div>
                      <label htmlFor="Abrv" className="block">Abbreviation</label>
                      <input
                        type="text"
                        id="Abrv"
                        name="Abrv"
                        value={vehicleModel?.Abrv || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded"
                      />
                  </div>
                  <div>
                      <label htmlFor="MakeId" className="block">Car Maker</label>
                      <select
                        id="MakeId"
                        name="MakeId"
                        value={vehicleModel?.MakeId || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded"
                      >
                          <option value="">Select a Maker</option>
                          {makes.map(make => (
                            <option key={make.Id} value={make.Id}>
                                {make.Name}
                            </option>
                          ))}
                      </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                    disabled={updateLoading}
                  >
                      Save Changes
                  </button>
                  {updateError && <p className="text-red-500">{updateError}</p>}
              </form>
          </div>
      </div>
    );
};

export default EditCarPage;
