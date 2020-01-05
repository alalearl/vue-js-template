// this is for public route that everyone can access
const routes = [];

export default routes.map(route => {
  const meta = {
    public: true,
  };
  return { ...route, meta };
});
