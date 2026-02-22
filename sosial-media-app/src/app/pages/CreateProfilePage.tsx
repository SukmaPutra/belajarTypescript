import ProfileForm from "@/components/profile/ProfileForm";
import useCreateProfile from "@/features/profile/hooks/useCreateProfile";

const CreateProfilePage = () => {
  const {
    form,
    errors,
    loading,
    setField,
    toggleHobby,
    setAvatarUrl,
    onSubmit,
  } = useCreateProfile();

  return (
    <ProfileForm
      form={form}
      errors={errors}
      loading={loading}
      setField={setField}
      toggleHobby={toggleHobby}
      setAvatarUrl={setAvatarUrl}
      onSubmit={onSubmit}
      submitLabel="Buat Profile"
    />
  );
};

export default CreateProfilePage;