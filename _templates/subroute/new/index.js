module.exports = {

  prompt : async ({ prompter, args }) => {

    let { baseRoute } = await prompter.prompt({
      type : 'input',
      name : 'baseRoute',
      message : 'Define base route, where sub route will be part of'
    });

    let { subRoute } = await prompter.prompt({
      type : 'input',
      name : 'subRoute',
      message : 'Define new sub route (like "/" or "/:id")'
    });
  
    let { method } = await prompter.prompt({
      type : 'select',
      name : 'method',
      choices : ['GET', 'POST', 'PUT', 'DELETE'],
      message : 'What method should be used ?'
    });
  
    let { controller } = await prompter.prompt({
      type : 'input',
      name : 'controller',
      message : 'What\'s the name of the controller ?'
    });

    if (baseRoute[0] == '/') {
      baseRoute = baseRoute.substring(1);
    }

    if (subRoute[0] == '/') {
      subRoute = subRoute.substring(1);
    }

    let controllerCategory = "";
    switch (method) {
      case    "GET" : controllerCategory    = "get"; break;
      case    "POST" : controllerCategory   = "create"; break;
      case    "PUT" : controllerCategory    = "update"; break;
      case    "DELETE" : controllerCategory = "delete"; break;
      default : controllerCategory          = "get"; break;
    }

    return {
      baseRoute,
      subRoute,
      method,
      controller,
      controllerCategory
    }

  }

}





