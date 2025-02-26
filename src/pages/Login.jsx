const Login = () => {
  const { session, handleLogout, loading, errorMessage } = useLogin();
  const { userEmail, fetchEmails } = useAdmin();

  useEffect(() => {
    fetchEmails();
  }, []);

  const us = userEmail.find((e) => e.email.includes(session?.user?.email));

  if (us?.email) {
    return (
      <div>
        <div className="bg-[#969da1] text-white flex justify-evenly items-center p-4 md:px-20">
          <div className="text-blue-900 text-xl flex flex-col md:flex-row">
            <h4 className="text-blue-900">Welcome,</h4>
            <p className="text-gray-900">
              {us?.email}
              <span className="text-blue-900">
                {us?.email === "samaalatwi23@gmail.com"
                  ? " (Admin)"
                  : " (User)"}
              </span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="cursor-pointer bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>

        {/* عرض رسالة الخطأ إن وجدت */}
        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}

        <AppRoute />
      </div>
    );
  } else {
    return (
      <div className="w-[400px] mx-auto shadow-2xl p-4 mt-14">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          onlyThirdPartyProviders={true}
        />
      </div>
    );
  }
};

export default Login;
