import { useState } from 'react'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { useTranslation } from 'react-i18next'
import Button from '../../../mui/Button'
import Table from '../../../mui/Table'
import TableRow from '../../../mui/TableRow'
import AddMemberToGroupDialog from '../../AddMemberToGroupDialog'
import { GroupRow } from './GroupRow'

export const GroupTable = ({
  allUsers,
  members,
  addMembersToGroup,
  deleteMember,
  viewMember,
  showLastAnsweredAt,
}: any) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState<boolean>(false)
  const onConfirm = (users: any[]) => {
    addMembersToGroup(users)
    setOpen(false)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('employee')}</TableCell>
              <TableCell>{t('email')}</TableCell>
              {showLastAnsweredAt && (
                <TableCell>{t('myGroup.lastAnswered')}</TableCell>
              )}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((u: any) => (
              <GroupRow
                key={u.Username}
                user={u}
                deleteMember={deleteMember}
                viewMember={viewMember}
                showLastAnsweredAt={showLastAnsweredAt}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddIcon />}
        onClick={() => setOpen(true)}
      >
        {t('myGroup.addMembers')}
      </Button>
      <AddMemberToGroupDialog
        open={open}
        onCancel={() => setOpen(false)}
        allUsers={allUsers}
        members={members}
        onConfirm={onConfirm}
      />
    </>
  )
}