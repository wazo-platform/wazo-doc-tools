const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const { retrieveGithubFiles, getRepo } = require('./utils');

module.exports = async () => {
  // Retrieve all diagrams
  const diagramOutputDir = path.resolve('./public/diagrams/');
  exec(`mkdir -p ${diagramOutputDir}`);
  exec(`rm -rf ${diagramOutputDir}/*`);

  const files = await retrieveGithubFiles(getRepo('wazo-pbx/wazo-doc-ng'), '/', /\.puml$/);
  Object.keys(files).forEach(basePath =>
    Object.keys(files[basePath]).forEach(fileName => {
      const repoName = basePath.split('/')[0];

      fs.writeFileSync(`/tmp/${repoName}-${fileName}`, files[repo][fileName]);
    })
  );

  // Generate puml to svg
  exec(`java -jar $JAVA_HOME/lib/plantuml.jar -tsvg /tmp/*.puml -o ${diagramOutputDir}`);
};
