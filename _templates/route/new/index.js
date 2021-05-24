module.exports = {

  prompt : async ({ prompter }) => {

    let { baseRoute } = await prompter.prompt({
      type : 'input',
      name : 'baseRoute',
      message : 'Define new base route (like "/users")'
    });

    if (baseRoute[0] == '/') {
      baseRoute = baseRoute.substring(1);
    }

    return {
      baseRoute
    }

  }

}