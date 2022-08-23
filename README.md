# AWS CDK + Github actions CI/CD

A repository for an article on
[akermiabdelhak.com](https://akermiabdelhak.com/blog/aws-cdk-github-actions-ci-cd) 

> You must have an aws account

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. Create new aws profile via cli

4. add your secrets variables via github cli or ui

5. commit and push your code to execute github actions

6. Cleanup

```bash
npx aws-cdk destroy
```