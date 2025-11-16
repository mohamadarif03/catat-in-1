import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'; 
import { useTheme } from '@mui/material/styles';
import type { Folder } from '../../types/folder.types';

interface FolderDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; iconColor: string }) => void; 
  initialData?: Folder | null; 
}

function FolderDialog({ open, onClose, onSave, initialData }: FolderDialogProps): React.JSX.Element {
  const theme = useTheme();

  const isEditMode = Boolean(initialData);

  const [folderName, setFolderName] = useState('');
  const [selectedIconColor, setSelectedIconColor] = useState(theme.palette.primary.main); // Warna default

  const iconColors = [
    theme.palette.primary.main, // Biru terang
    theme.palette.secondary.main, // Oranye
    theme.palette.success.main, // Hijau (success default MUI)
    theme.palette.error.main,   // Merah (error default MUI)
    theme.palette.info.main,    // Ungu/Cyan (info default MUI)
    theme.palette.grey[500],    // Abu-abu
  ];

  useEffect(() => {
    if (open) { // Hanya jalankan saat dialog terbuka
      if (isEditMode && initialData) {
        // Mode Edit: Isi form dengan data yang ada
        setFolderName(initialData.name);
        setSelectedIconColor(initialData.iconColor);
      } else {
        setFolderName('');
        setSelectedIconColor(theme.palette.primary.main);
      }
    }
  }, [open, isEditMode, initialData, theme.palette.primary.main]);

  const handleSave = () => {
    if (folderName.trim()) {
      onSave({ name: folderName.trim(), iconColor: selectedIconColor });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs" // Ukuran dialog kecil
      fullWidth // Dialog akan mengambil lebar maksimum yang diizinkan oleh maxWidth
      PaperProps={{ sx: { borderRadius: '16px' } }} // Membulatkan sudut dialog
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {/* Teks dinamis berdasarkan mode */}
          {isEditMode ? 'Edit Folder' : 'Create New Folder'}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 2, borderBottom: 'none' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {/* Teks dinamis berdasarkan mode */}
          {isEditMode
            ? 'Enter a new name or select a new icon for your folder.'
            : 'Enter a name for your new folder.'}
        </Typography>

        {/* Input Nama Folder */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Folder Name</Typography>
        <TextField
          autoFocus
          margin="dense"
          id="folderName"
          placeholder="e.g., Biology Midterm Prep"
          type="text"
          fullWidth
          variant="outlined"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{ sx: { borderRadius: '8px' } }} // Membulatkan input field
        />

        {/* Pilihan Icon Folder */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Folder Icon</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {iconColors.map((color) => (
            <IconButton
              key={color}
              onClick={() => setSelectedIconColor(color)}
              sx={{
                p: 1.5,
                borderRadius: '8px',
                border: 2,
                borderColor: selectedIconColor === color ? 'primary.main' : 'transparent',
                backgroundColor: selectedIconColor === color ? theme.palette.primary.light + '22' : 'transparent', // sedikit latar belakang
              }}
            >
              <FolderOutlinedIcon sx={{ color: color, fontSize: 30 }} />
            </IconButton>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="text" onClick={onClose} sx={{ color: 'text.secondary', textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary" // Warna oranye
          onClick={handleSave}
          disabled={!folderName.trim()}
          sx={{ textTransform: 'none' }}
        >
          {/* Teks tombol dinamis berdasarkan mode */}
          {isEditMode ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FolderDialog;