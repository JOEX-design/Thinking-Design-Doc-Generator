import { Octokit } from "@octokit/rest"

type gitData = {
    owner?: string;
    repo?: string;
    filePath?: string;
    gitToken?: string;
}

const commitToGithub = async ({
    owner,
    repo,
    filePath,
    gitToken,
  }: gitData, jsonObject) => {
    // const owner = "JOEX-Design";
    // const repo = "Tikit-Design-Doc-Data";
    // const filePath = 'test.json'
    const jsonString = JSON.stringify(jsonObject, null, 2); // Indent with 2 spaces for better readability
    

    const octokit = new Octokit({
      auth: gitToken
    });

    // Get the default branch name (e.g., "main")
    const { data: repoData } = await octokit.repos.get({
      owner,
      repo
    });

    const defaultBranch = repoData.default_branch;

    // Get the latest commit of the default branch
    const { data: commit } = await octokit.repos.getBranch({
      owner,
      repo,
      branch: defaultBranch
    });

    // Create blob
    const blob = await octokit.git.createBlob({
      owner,
      repo,
      content: jsonString,
      encoding: "utf-8"
    });

    // Create tree
    const newTree = await octokit.git.createTree({
      owner,
      repo,
      tree: [
        {
          path: filePath,
          mode: "100644",
          type: "blob",
          sha: blob.data.sha
        }
      ],
      base_tree: commit.commit.sha
    });

    let date = new Date().toLocaleDateString()

    // Create commit
    const newCommit = await octokit.git.createCommit({
      owner,
      repo,
      message: `${date}: update ${filePath}`,
      tree: newTree.data.sha,
      parents: [commit.commit.sha]
    });
    


    // Update branch reference
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${defaultBranch}`,
      sha: newCommit.data.sha
    });
    console.log("JSON file committed!");

  }

  export default commitToGithub