import {
  Badge,
  ListItemButton,
  Collapse,
  List,
  ListItemText,
  Skeleton,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import React, { Fragment } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Panel } from '../types'
import styled from '@emotion/styled'
import { menuWidth } from '../styleconstants'

type MenuItemProps = {
  panelId: Panel
  show: boolean
  items: any
  text: string
  alert: any
  activeSubmenuItem: string
  handleMenuClick: any
}

const StyledSkeletonMenu = styled.div`
  * {
    min-height: 30px;
  }
`

const LoadingSkeleton = () => {
  return (
    <StyledSkeletonMenu>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </StyledSkeletonMenu>
  )
}

const DropdownMenuItem = ({
  show,
  panelId,
  items,
  text,
  alert,
  activeSubmenuItem,
  handleMenuClick,
}: MenuItemProps) => {
  if (!show) return null

  const { t } = useTranslation()

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const hasChildren = items.length !== 0
  const isGroupmenuAndNotLoaded = !hasChildren && panelId === Panel.GroupLeader

  const subMenuItems = (activeSubmenuItem: any, items: any) =>
    items.map((item: any) => (
      <ListItemButton
        className="submenuItem"
        key={item.key}
        onClick={() => handleMenuClick(panelId, item.key)}
        selected={item.key === activeSubmenuItem}
      >
        <Badge badgeContent={item.alert} color="warning">
          <ListItemText sx={{ maxWidth: menuWidth - 10 }}>
            {t(item.text)}
          </ListItemText>
        </Badge>
      </ListItemButton>
    ))

  const hasMainPanel = panelId in [Panel.GroupLeader, Panel.Overview]

  const handleMainItemClick = () => {
    if (!hasMainPanel && hasChildren) {
      handleMenuClick(panelId, items[0].key)
    } else {
      handleMenuClick(panelId, 'MAIN')
    }

    hasChildren && setDrawerOpen(!drawerOpen)
    isGroupmenuAndNotLoaded && setDrawerOpen(!drawerOpen)
  }

  return (
    <Fragment>
      <ListItemButton
        onClick={() => {
          handleMainItemClick()
        }}
      >
        <Badge badgeContent={alert} color="warning">
          <ListItemText>{t(text)}</ListItemText>
        </Badge>
        {hasChildren && (drawerOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      <Collapse in={drawerOpen} timeout="auto" unmountOnExit>
        {isGroupmenuAndNotLoaded ? (
          <List>
            <LoadingSkeleton />
          </List>
        ) : (
          <List component="div">{subMenuItems(activeSubmenuItem, items)}</List>
        )}
      </Collapse>
    </Fragment>
  )
}

export { DropdownMenuItem }