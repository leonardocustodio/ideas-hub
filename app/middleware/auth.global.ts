export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  const isPublicRoute = ['/intro'].includes(to.path)

  if (!loggedIn.value && !isPublicRoute) {
    return navigateTo('/intro')
  }

  if (loggedIn.value && to.path === '/intro') {
    return navigateTo('/')
  }
})
