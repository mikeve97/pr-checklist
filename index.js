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
    const incompleteList = [];

    matches.forEach(match => {
        const isComplete = match[1] != " ";
        !isComplete && incompleteList.push(match[2]);
    })

    if (incompleteList.length > 0) {
        core.setFailed(`Incomplete tasks: \n ${incompleteList.join("\n")}`);
        return;
    }
} catch (error) {
    core.error(error);
    core.setFailed(error.message);
}