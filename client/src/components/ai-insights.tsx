import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Bot, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AIInsightsProps {
  insights: string | null;
  isLoading?: boolean;
  onAskAI?: (question: string) => void;
}

export function AIInsights({ insights, isLoading }: AIInsightsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!insights && !isLoading) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent" data-testid="card-ai-insights">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-base">AI Insights</CardTitle>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-2">
            {isLoading ? (
              <div className="flex items-center gap-2 py-4 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Analyzing your package...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-md bg-background/50 p-3">
                  <Bot className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {insights}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
