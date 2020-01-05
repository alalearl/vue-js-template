// this is for private route that user or maybe you can access
const routes = [];

export default routes.map(route => {
  const meta = {
    public: false,
  };
  return { ...route, meta };
});
