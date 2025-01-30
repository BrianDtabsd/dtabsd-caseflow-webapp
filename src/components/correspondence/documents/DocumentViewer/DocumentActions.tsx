import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Print,
  Download,
  DriveFileMove,
  Save,
  MoreVert,
} from '@mui/icons-material';

interface DocumentActionsProps {
  documentId: string;
  onPrint: () => void;
  onDownload: () => void;
  onMove: (targetCaseId: string) => void;
  onSave: () => void;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({
  documentId,
  onPrint,
  onDownload,
  onMove,
  onSave,
}) => {
  const [moveDialogOpen, setMoveDialogOpen] = React.useState(false);
  const [targetCaseId, setTargetCaseId] = React.useState('');
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleMoveConfirm = () => {
    onMove(targetCaseId);
    setMoveDialogOpen(false);
    setTargetCaseId('');
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <ButtonGroup variant="outlined" size="small">
          <Button
            startIcon={<Print />}
            onClick={onPrint}
          >
            Print
          </Button>
          <Button
            startIcon={<Download />}
            onClick={onDownload}
          >
            Download
          </Button>
          <Button
            startIcon={<DriveFileMove />}
            onClick={() => setMoveDialogOpen(true)}
          >
            Move
          </Button>
          <Button
            startIcon={<Save />}
            onClick={onSave}
          >
            Save
          </Button>
          <Button
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVert />
          </Button>
        </ButtonGroup>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => {
          setMenuAnchor(null);
          // Additional actions
        }}>
          More Actions
        </MenuItem>
      </Menu>

      <Dialog
        open={moveDialogOpen}
        onClose={() => setMoveDialogOpen(false)}
      >
        <DialogTitle>Move Document</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Target Case ID"
            fullWidth
            variant="outlined"
            value={targetCaseId}
            onChange={(e) => setTargetCaseId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoveDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleMoveConfirm} variant="contained">
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 