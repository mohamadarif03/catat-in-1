import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {  Search, UserPlus, Check, X } from "lucide-react";

type Friend = {
  id: string;
  username: string;
  streak: number;
};

export default function FriendsPage() {
  // sample friends
  const [friends, setFriends] = useState<Friend[]>(
    [
      { id: "1", username: "alice", streak: 12 },
      { id: "2", username: "bob", streak: 4 },
      { id: "3", username: "carol", streak: 21 },
      { id: "4", username: "dave", streak: 3 },
    ]
  );

  // pending requests (simulate incoming friend requests)
  const [requests, setRequests] = useState<Friend[]>(
    [
      { id: "r1", username: "eve", streak: 0 },
      { id: "r2", username: "mallory", streak: 1 },
    ]
  );

  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [inviteUsername, setInviteUsername] = useState("");

  // filtered friends based on search
  const visibleFriends = useMemo(
    () => {
      const q = search.trim().toLowerCase();
      if (!q) return friends;
      return friends.filter(
        (f) => f.username.toLowerCase().includes(q) || String(f.streak).includes(q)
      );
    },
    [friends, search]
  );

  function acceptRequest(id: string) {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setRequests((r) => r.filter((x) => x.id !== id));
    setFriends((f) => [{ ...req, id: String(Date.now()) }, ...f]);
  }

  function rejectRequest(id: string) {
    setRequests((r) => r.filter((x) => x.id !== id));
  }

  function sendInvite() {
    const username = inviteUsername.trim();
    if (!username) return;
    // simulate adding to requests (incoming)
    const newReq: Friend = { id: `r-${Date.now()}`, username, streak: 0 };
    setRequests((r) => [newReq, ...r]);
    setInviteUsername("");
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 w-full">
          <div className="text-lg font-semibold">Friends</div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <Button onClick={() => setSheetOpen(true)} variant="default">
            <UserPlus className="mr-2" /> Manage
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Friends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {visibleFriends.length === 0 ? (
              <div className="text-sm text-muted-foreground">No friends found.</div>
            ) : (
              visibleFriends.map((f) => (
                <div key={f.id} className="flex items-center justify-between gap-3 p-3 rounded-md border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {f.username.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{f.username}</div>
                      <div className="text-xs text-muted-foreground">Friend</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      {/* <Fire className="text-destructive" /> */}
                      <span className="font-medium text-foreground">{f.streak}</span>
                    </div>
                    <Button size="sm" variant="ghost">Message</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Manage Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[380px]">
          <SheetHeader>
            <SheetTitle>Manage Friends</SheetTitle>
          </SheetHeader>

          <div className="mt-3 space-y-4">
            {/* Invite form */}
            <div>
              <div className="text-sm text-muted-foreground mb-2">Invite / Simulate request</div>
              <div className="flex gap-2">
                <Input
                  placeholder="username"
                  value={inviteUsername}
                  onChange={(e) => setInviteUsername(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendInvite(); }}
                />
                <Button onClick={sendInvite}>Send</Button>
              </div>
            </div>

            <Separator />

            {/* Pending requests */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Pending Requests</div>
                <div className="text-xs text-muted-foreground">{requests.length}</div>
              </div>

              {requests.length === 0 ? (
                <div className="text-sm text-muted-foreground">No pending requests.</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {requests.map((r) => (
                    <div key={r.id} className="flex items-center justify-between gap-3 p-2 rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                          {r.username.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{r.username}</div>
                          <div className="text-xs text-muted-foreground">Requested you</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="default" onClick={() => acceptRequest(r.id)}>
                          <Check />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => rejectRequest(r.id)}>
                          <X />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}