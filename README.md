# Work item checker

This action checks if the work item is referenced within the pull request and if not updates the pull request to include it. 

## Inputs

### `Token`

**Required** The GITHUB_TOKEN secret.

## Outputs

### `pr_title`

If the PR title was updated

### `pr_body`

If the PR body was updated

## Example usage

```yaml
uses: actions/PR-Checklist
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
```
