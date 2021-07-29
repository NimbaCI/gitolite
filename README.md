# Gitolite 🔧

Gitolite allows you to manage git repos, users and permissions on your git server.

If you use Express as a backend server running on your repos server, this package will help you.

⚠️

To use this package, it is important that you follow the [Gitolite foolproof tutorial](https://gitolite.com/gitolite/fool_proof_setup.html) and setup a `git` user on your server. When asked to clone the gitolite admin repo on your local workspace, make sure that you clone it on the server where your express server runs. Most-likely, another user on the server.

## Gitolite.init

Gitolite is a singleton so you can't use its regular constructor.

To initialise it, you need to call the static function `init()` and pass it the required parameters.

```typescript
  const gitolite = Gitolite.init({
    adminRepoPath: "/absolute/path/to/gitolite/admin/repo",
    permissionsConfigFilePath: "/absolute/path/to/repos/config/file"
  })
```

Once you have `gitolite` configured, you can call its mthods.

## users.add ➕👤

In order for a user to be added to the gitolite system, you will need to provide their `username` and `sshKey` (obviously, the public one).

```typescript
  gitolite.users.add(username, sshKey);
```

Gitolite will commit and push everything for you to save the changes.

## users.remove ➖👤

To remove a user, just specify their `username`.

```typescript
  gitolite.users.remove(username);
```

Gitolite will commit and push everything for you to save the changes.

## repos.add ➕📁

To add a repository, you need to specify the `name of the repository` and the `username` of the owner.

```typescript
  gitolite.repos.add(repoName, username);
```

Gitolite will commit and push everything for you to save the changes.

## repos.remove ➖📁

To remove a repository, you also need to specify the `name of the repository` and the `username` of the owner.

```typescript
  gitolite.repos.remove(repoName, username);
```

Gitolite will commit and push everything for you to save the changes.

For any help, you can email me here: tanohzana@gmail.com or reach me on Twitter [@florian_adonis](https://twitter.com/florian_adonis)