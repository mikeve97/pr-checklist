const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('token');
    if (!token) {
        core.setFailed('jissing GitHub access token.');
        return;
    }

    const prBranchName = github.context.payload.pull_request.head.ref;
    const prTitle = github.context.payload.pull_request.title;
    const prBody = github.context.payload.pull_request.body;
    const workItem = prBranchName.split('-')[0].trim();

    if (isNaN(workItem)) {
        core.setFailed('Branch name does not include work item number.');
        return;
    }

    if (prTitle.includes(workItem) && prBody.includes(workItem)) {
        core.info('PR title and body already contains work item number.');
        return;
    }

    const newPrTitle = `${workItem} - ${prTitle}`;
    const newPrBody = `${prBody}\n Work item: AB#${workItem}`;

    if (!prTitle.includes(workItem)) {
        core.info(`Updating PR title to: ${newPrTitle}`);
        core.setOutput('pr_title', newPrTitle);
    }

    if (!prBody.includes(workItem)) {
        core.info(`Updating PR body to: ${newPrBody}`);
        core.setOutput('pr_body', newPrBody);
    }

    const octokit = new github.GitHub(token);
    octokit.pulls.update({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: github.context.payload.pull_request.number,
        body: newPrBody,
        title: newPrTitle
    });

} catch (error) {
    core.error(error);
    core.setFailed(error.message);
}