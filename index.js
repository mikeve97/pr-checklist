const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('token');
    if (!token) {
        core.setFailed('Missing GitHub access token.');
        return;
    }

    const prBody =  github.context.payload.pull_request.body || '';
	
    if (prBody.some(x => x)) {
        core.setFailed('Body does not include a checklist');
        return;
    }
	
} catch (error) {
    core.error(error);
    core.setFailed(error.message);
}