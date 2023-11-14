const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('token');
    if (!token) {
        core.setFailed('Missing GitHub access token.');
        return;
    }

    const prBody = github.context.payload.pull_request.body || false;

    if (!prBody) {
        core.setFailed('Missing PR body.');
        return;
    }

    const matches = [...prBody.matchAll(/(?:^|\n)\s*-\s+\[([ xX])\]\s+((?!~).*)/g)];
    core.info(`Tasks are \n ${matches.join(", ")}`);
    const incompleteList = [];
    matches.forEach(match => {
        core.info(`Found match: ${match.join(", ")}`);
        const isComplete = item[1] != " ";
        core.info(`Found task: ${match[2]}`);

        if (!isComplete) {
            incompleteList.push(match[2]);
        }
    })

    if (incompleteList.length > 0) {
        core.setFailed(`Incomplete tasks: ${incompleteList.join(", ")}`);
        return;
    }
} catch (error) {
    core.error(error);
    core.setFailed(error.message);
}