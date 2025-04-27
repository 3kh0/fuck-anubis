# fuck anubis

this is a simple browser extension that automatically bypasses [anubis](https://github.com/TecharoHQ/anubis)

## how

[by design](https://github.com/TecharoHQ/anubis/blob/main/docs/docs/design/how-anubis-works.mdx#challenge-presentation),
anubis won't send you a challenge if you don't have `Mozilla` in your user agent. 

this extension will detect anubis catcher page and will override user agent to a string that doesn't contain `Mozilla`.