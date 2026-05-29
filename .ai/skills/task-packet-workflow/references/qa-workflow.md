# QA Workflow

QA is read-only unless explicitly assigned otherwise.

QA must verify:
- active branch
- latest main / target branch
- task packet status
- implementation report
- validation output
- forbidden actions
- source diff

QA must stop if:
- required commits are missing
- wrong branch is checked out
- working tree is dirty unexpectedly
- task packet is missing
- implementation report is missing

PDF export, auth, RBAC, e-LAAS automation, and real-document storage are out of scope unless explicitly assigned.
