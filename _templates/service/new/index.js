module.exports = {

  prompt : async ({ prompter }) => {

    let { name } = await prompter.prompt({
      type : 'input',
      name : 'name',
      message : 'What\'s the service called (like "customService"):'
    });

    return {
      name
    }

  }

}